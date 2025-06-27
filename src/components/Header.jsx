import "./Header.css";

const Header = ({left_img, text}) => {
    return (
        <div className="header">
            <div className="img_wrapper">
                <img src={left_img} alt="close" />
            </div>

            <div className="text_wrapper">
                {text}
            </div>
        </div>
    )
}

export default Header;