import * as React from "react";
import heroImg from "../images/heroImg.jpg";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { useStyletron } from "baseui";
import { DisplayLarge, DisplaySmall } from "baseui/typography";

const itemProps = {
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
}

const textProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent:"center",
  alignItems:"center",
  height: "100%",
  color: "white"

}

const LandingPage = () => {
  const [css] = useStyletron();

  return(
    <FlexGrid
      flexGridColumnCount={1}
    > 
      <FlexGridItem {...itemProps}>
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
          <DisplayLarge {...textProps}>
            <div>Streaming Statistics</div>
            <div className={css({
                  fontSize:"2rem",
            })}
            >
            Get statistics on your streaming habits from <span className={css({color:"#E50914"})}>Netflix!</span></div>
          </DisplayLarge>
        </div>
      </FlexGridItem>
    </FlexGrid>
  )
}

export default LandingPage;