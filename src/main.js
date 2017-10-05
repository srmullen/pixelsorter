import "tachyons";
import "./styles/styles.css";
import "babel-polyfill";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import Image from "components/Image";
import SortDemo from "components/SortDemo";
import image from "images/tokyo_rain.jpg";
import * as compare from "./compare";
import * as exchange from "sort/exchange";
import * as selection from "sort/selection";
import * as bubble from "sort/bubble";
import * as insertion from "sort/insertion";
import * as shell from "sort/shell";

import * as browser from "../test/browser";

window.browser = browser;

class Main extends Component {
    render () {
        return (
            <div>
                <SortDemo
                    title="Bubble Sort"
                    exchange={exchange.indices}
                    compare={compare.number}
                    sort={bubble.gen} />
                <SortDemo
                    title="Selection Sort"
                    exchange={exchange.indices}
                    compare={compare.number}
                    sort={selection.gen} />
                <SortDemo
                    title="Insertion Sort"
                    exchange={exchange.indices}
                    compare={compare.number}
                    sort={insertion.gen} />
                <SortDemo
                    title="Shell Sort"
                    exchange={exchange.indices}
                    compare={compare.number}
                    sort={shell.gen} />
                {/* <Image image={image} /> */}
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
