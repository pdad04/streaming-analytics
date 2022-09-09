import * as React from "react";
import heroImg from "../images/heroImg.jpg";
import { useStyletron } from "baseui";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Accordion, Panel } from "baseui/accordion";
import { DisplayLarge, ParagraphLarge, HeadingXXLarge} from "baseui/typography";
import { StyledLink } from "baseui/link";
import ChevronDown  from "baseui/icon/chevron-down";
import UploadModal from "./UploadModal";


const heroProps = {
  position: "relative"
}

const heroTextProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent:"center",
  alignItems:"center",
  height: "100%",
  color: "white"

}

const chevronProps = {
  position: "absolute",
  bottom: "0",
  display: "flex",
  justifyContent: "center",
  color: "white"

}

const landingContentProps = {
  padding: "15rem 2rem 5rem",
  display: "flex",
  width: "100%",
  maxWidth: "1500px",
  margin: "0 auto"
}


const LandingPage = ({ getResponse }) => {
  const [css] = useStyletron();

  return (
    <React.Fragment>
      <FlexGrid
        flexGridColumnCount={1}
        {...heroProps}
      > 
        <FlexGridItem>
          <div 
            className={css({
              backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImg})`,
              width:"100vw", 
              height:"100vh", 
              backgroundSize:"cover", 
              backgroundPosition:"center", 
              backgroundRepeat:"no-repeate", 
              position:"relative"})}
          >
            <DisplayLarge {...heroTextProps}>
              <div>Streaming Statistics</div>
              <div className={css({
                    fontSize:"2rem",
              })}
              >
              Get statistics on your <span className={css({color:"#E50914"})}>Netflix</span> streaming habits!</div>
            </DisplayLarge>
          </div>
        </FlexGridItem>
        <FlexGridItem {...chevronProps} >
          <ChevronDown size={100} />
        </FlexGridItem>
      </FlexGrid>
      <FlexGrid flexGridColumnCount={1} flexGridRowGap={"2rem"} {...landingContentProps}>
        <FlexGridItem>
              <HeadingXXLarge marginBottom={"2rem"}>Statistics for your streaming</HeadingXXLarge>
              <ParagraphLarge>
                Ever been curious just how much time you've actually spent streaming on Netflix, or how many times you've watched your favorite show? Curious which days of the week you stream the most? That's the data that Streaming Statistics provides! You simply download your <StyledLink href=" https://www.netflix.com/account/getmyinfo">Netflix</StyledLink> data, upload the 'ViewingActivity.csv' file and we crunch the numbers and display key statistics for you to view!
              </ParagraphLarge>
          </FlexGridItem>
        <FlexGridItem>
          <UploadModal
            getResponse={getResponse}
          />
          <HeadingXXLarge margin={"2rem 0"}>FAQ</HeadingXXLarge>
              <Accordion accordion>
                <Panel title="Do you store any of my data?">Only briefly, just as long as it takes to calcualate your statistics! When you upload your file it gets saved so we can read the contents and do the calculations. Once you see the output in your browser window, your file has already been deleted!</Panel>
                <Panel title="Where can I get my data to upload?">You can download it at <StyledLink href=" https://www.netflix.com/account/getmyinfo">Netflix</StyledLink>. Netflix says it can take up to 30 days for them to provide the file, but in most cases it's much, much faster than that!</Panel>
                <Panel title="How do I know which file to upload to your site?">The file you need to upload is called "ViewingActivity.csv" (as of August 2022) which is found in the 'Content Interaction' folder in the data Netflix's provides.</Panel>
                <Panel title="Why am I getting an error about missing columns when I try to upload a file?">The file you get from Netflix has multiple columns, to calculate your stats we utilize the following columns: 'Profile Name', 'Start Time, 'Duration', and 'Title'. Ensure your file has columns with those headings.</Panel>
                <Panel title="Why do you just do Netflix?">I had to start somewhere :). I'll look to add the ability to provide stats from other streaming providers, but this will largly be dependent on what data those providers make available for account holders to download.</Panel>
              </Accordion>
        </FlexGridItem>
      </FlexGrid>
    </React.Fragment>
  )
}

export default LandingPage;