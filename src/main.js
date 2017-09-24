import "tachyons";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import Image from "components/Image";
import image from "images/tokyo_rain.jpg";

class Main extends Component {
    render () {
        return (
            <Image image={image} />
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
