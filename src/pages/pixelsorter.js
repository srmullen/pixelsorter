import "tachyons";
import "styles/styles.css";
import "babel-polyfill";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import Image from "components/Image";
import image from "images/six_pack_jason_walker.jpg";

const SHOW_SORT_STATE = true;

class Main extends Component {
    render () {
        return (
            <div>
                <Image image={image} scale={0.5} />
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
