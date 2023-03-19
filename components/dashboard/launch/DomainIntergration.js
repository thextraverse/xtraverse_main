import styled from "@emotion/styled";
import { Box, Button, Grid } from "@mui/material";
import { Form } from "../../styles/homepage.styled";
import { registerDomain, addDomainToFirebase, deployWebsite } from './GoDaddy';

function WebsiteForm() {
  const [domainName, setDomainName] = useState('');
  const [projectId, setProjectId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Register domain with GoDaddy
    const authorizationToken = await getAuthorizationToken();
    const registeredDomain = await registerDomain(authorizationToken, domainName);

    // Add domain to Firebase
    const firebaseAccessToken = process.env.FIREBASE_ACCESS_TOKEN;
    const addedDomain = await addDomainToFirebase(projectId, registeredDomain, firebaseAccessToken);

    // Deploy website to Firebase Hosting
    const websiteId = 'your-website-id'; // Replace with your website ID
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

const DomainIntergration = () => (
  <FBform>
    {/* <Form>
      <Grid container>
        <Grid xs={12}>
          <Box>
            <span>Name </span>
            <input type="text" placeholder=" Name" required />
          </Box>
          <Box>
            <span>User name</span>
            <input type="text" placeholder=" username" required />
          </Box>
        </Grid>
        <Grid xs={12}>
          <Box>
            <span>Website link </span>
            <input type="text" placeholder="url" required />
          </Box>
        </Grid>
        <Grid xs={12}>
          <Box>
            <span>Email </span>
            <input type="text" placeholder="Name" required />
          </Box>
          <Box>
            <span>Password</span>
            <input type="text" placeholder="Password" required />
          </Box>
        </Grid>
        <Button
          sx={{
            width: "100%",
            background: "#33fc98",
            borderRadius: "8px",
            color: "#000",
            fontSize: "1.2em",
            textTransform: "capitalize",
            padding: "8px 0px",
            transition: "0.3s",
            fontWeight: "500",
            margin: "10px 0px",
            "&:hover ": {
              background: "#fff",
              color: "#000",
            },
          }}
        >
          Submit
        </Button>
      </Grid>
    </Form> */}
  </FBform>
);
export default DomainIntergration;
