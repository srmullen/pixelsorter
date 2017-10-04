import "tachyons";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import Image from "components/Image";
import SortDemo from "components/SortDemo";
import image from "images/tokyo_rain.jpg";
import * as compare from "./compare";
import * as selection from "sort/selection";
import * as exchange from "sort/exchange";

import * as browser from "../test/browser";

window.browser = browser;

class Main extends Component {
    render () {
        return (
            <div>
                <SortDemo
                    exchange={exchange.indices}
                    compare={compare.number}
                    sort={selection.sort} />
                {/* <Image image={image} /> */}
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
