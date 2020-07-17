import dynamic from "next/dynamic";
import Button from "@material-ui/core/Button";

const IndexPage = () => (
  <div>
    You Done Yet
    <Button variant="contained" color="primary">
      Primary
    </Button>
  </div>
);

export default dynamic(() => Promise.resolve(IndexPage), {
  ssr: false,
});
