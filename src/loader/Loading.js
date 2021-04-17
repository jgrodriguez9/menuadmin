import ThreeHorseLoading from "react-loadingg/lib/ThreeHorseLoading";
import './Loading.css'

const commonStyle = {
    margin: 'auto',
    position: 'initial',
    left: 0,
    right: 0,
    top:10,
    bottom:10
};

function Loading({texto}) {
    return  (
        <div className="react-loader-overlay">
            <div className="react-confirm-alert">
                <div className="custom-ui">
                        <h2>{texto ? texto : 'Cargando...'}</h2>
                        <ThreeHorseLoading color={"#6586FF"} style={commonStyle}/>
                </div>
            </div>
        </div>
    )
}

export default Loading