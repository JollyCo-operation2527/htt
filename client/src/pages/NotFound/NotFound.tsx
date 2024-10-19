import { Central as Layout } from "@/layouts";
import "./NotFound.style.scss";

function NotFound() {
  return (
    <Layout title={"Page Not Found"}>
      <h1>This page does not exist</h1>
      <img src="/404.gif" alt="404 gif here" ></img>
    </Layout>
    
  );
}

export default NotFound;
