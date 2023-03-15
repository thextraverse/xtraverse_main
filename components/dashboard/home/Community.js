import { Grid } from "@mui/material";
import { CommunityDiv } from "../../styles/dashboard.styled";

export default function Community() {
  return (
    <CommunityDiv>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <div>
            <p>Buyers</p>
            <h2>345</h2>
          </div>
        </Grid>

        <Grid item xs={5}>
          <div>
            <p>Sellers</p>
            <h2>223</h2>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className="tx-c">
            <p>Members</p>
            <h2>1276</h2>
          </div>
        </Grid>
      </Grid>

      <div
        style={{
          width: "100%",
          padding: "2px",
          background: "#444",
          margin: "10px 0 0 0 ",
        }}
      ></div>

      <div style={{ margin: "10px 0" }}>
        <p>Net worth</p>
        <h2>$ 123,456.99</h2>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={5}>
          <div>
            <p>Following</p>
            <h2>1,500</h2>
          </div>
        </Grid>

        <Grid item xs={5}>
          <div>
            <p>Correlating projects</p>
            <h2>1,500</h2>
          </div>
        </Grid>

        <Grid item xs={2}></Grid>
      </Grid>
    </CommunityDiv>
  );
}
