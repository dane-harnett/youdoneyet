import dynamic from "next/dynamic";

const IndexPage = () => <div>You Done Yet</div>;

export default dynamic(() => Promise.resolve(IndexPage), {
  ssr: false,
});
