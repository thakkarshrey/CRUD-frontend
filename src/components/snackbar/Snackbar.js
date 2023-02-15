import {PopUpContainer} from './Snackbar.styled' 

function Snackbar(props){
    const {showToast,message,backgroundColor} = props;
    return (
     <PopUpContainer backgroundColor={backgroundColor} showToast={showToast}>
      {message}
    </PopUpContainer> 
    )
}

export default Snackbar