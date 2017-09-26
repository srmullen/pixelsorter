import "tachyons";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import Image from "components/Image";
import image from "images/tokyo_rain.jpg";
import * as compare from "./compare";
import * as sort from "./sort";

import * as browser from "../test/browser";

window.sort = sort;
window.browser = browser;

class Main extends Component {
    render () {
        return (
            <Image image={image} />
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
