import { Central as Layout } from "@/layouts";
import "./NotFound.style.scss";

function NotFound() {
  return (
    <Layout title={"Page Not Found"}>
      <h1>This page does not exist</h1>
      <img src="https://cdn.dribbble.com/users/381530/screenshots/3949858/media/aff8c4541abddf91b8f69206b2175381.gif" alt="404 gif here" ></img>
    </Layout>
    
  );
}

export default NotFound;
