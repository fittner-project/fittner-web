module.exports = {
  api: {
    input: {
      target: "./swagger.json",
    },
    output: {
      mode: "tags-split",
      target: "./src/api/generated",
      schemas: "./src/api/generated/models",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/api/mutator/instance-wrapper.ts",
          name: "axiosInstance",
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: "page",
        },
      },
    },
  },
};
