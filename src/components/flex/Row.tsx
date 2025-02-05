import Flex, { FlexProps } from "./Flex";

const Row = ({
  justifyContent = "center",
  alignItems = "center",
  ...props
}: FlexProps) => {
  return (
    <Flex
      flexDirection="row"
      justifyContent={justifyContent}
      alignItems={alignItems}
      {...props}
    />
  );
};
export default Row;
