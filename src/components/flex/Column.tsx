import Flex, { FlexProps } from "./Flex";

const Column = ({
  justifyContent = "center",
  alignItems = "center",
  ...props
}: FlexProps) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent={justifyContent}
      alignItems={alignItems}
      {...props}
    />
  );
};
export default Column;
