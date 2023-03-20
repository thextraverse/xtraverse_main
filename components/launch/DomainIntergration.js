import styled from "@emotion/styled";
import { Box, Button, Grid } from "@mui/material";
import { Form } from "../../styles/homepage.styled";
import { registerDomain, addDomainToFirebase, deployWebsite } from "./GoDaddy";

function WebsiteForm() {
  const [domainName, setDomainName] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Register domain with GoDaddy
    const authorizationToken = await getAuthorizationToken();
    const registeredDomain = await registerDomain(
      authorizationToken,
      domainName
    );

    // Add domain to Firebase
    const firebaseAccessToken = process.env.FIREBASE_ACCESS_TOKEN;
    const addedDomain = await addDomainToFirebase(
      projectId,
      registeredDomain,
      firebaseAccessToken
    );

    // Deploy website to Firebase Hosting
    const websiteId = "your-website-id"; // Replace with your website ID
    await deployWebsite(projectId, websiteId, addedDomain);
  };

  const FBform = styled.div`
    width: 500px;
    margin: auto;
    span {
      padding: 10px 0px !important;
      display: block;
    }
    input {
      background: #252525 !important;
    }
  `;
  /* eslint-enable no-template-curly-in-string */

  const DomainIntergration = () => <FBform></FBform>;
}
export default DomainIntergration;
