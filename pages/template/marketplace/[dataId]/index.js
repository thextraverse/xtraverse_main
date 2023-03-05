import { useRouter } from "next/router";

function NftDataDetails() {
  const router = useRouter();
  const dataId = router.query.dataId;

  console.log(dataId);

  return <>kire</>;
}

export default NftDataDetails;
