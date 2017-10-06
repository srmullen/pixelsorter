import "tachyons";
import "./styles/styles.css";
import "babel-polyfill";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import Image from "components/Image";
import SortDemo from "components/SortDemo";
import QuickSort from "components/demo/QuickSort";
import image from "images/tokyo_rain.jpg";
import * as compare from "./compare";
import * as exchange from "sort/exchange";
import * as selection from "sort/selection";
import * as bubble from "sort/bubble";
import * as insertion from "sort/insertion";
import * as shell from "sort/shell";
import * as merge from "sort/merge";

import * as browser from "../test/browser";

window.browser = browser;

class Main extends Component {
    render () {
        return (
            <div>
                {/* <SortDemo
                    title="Bubble Sort"
                    exchange={exchange.indices}
                    compare={compare.number}
                    sort={bubble.demo} /> */}

                <QuickSort
                    exchange={exchange.indices}
                    compare={compare.number} />

                {/* <SortDemo
                    title="Merge Sort"
                    exchange={exchange.indices}
                    compare={compare.number}
                    sort={merge.gen} /> */}

                {/* <SortDemo
                    title="Selection Sort"
                    exchange={exchange.indices}
                    compare={compare.number}
                    sort={selection.demo} /> */}

                {/* <SortDemo
                    title="Insertion Sort"
                    exchange={exchange.indices}
                    compare={compare.number}
                    sort={insertion.demo} /> */}

                {/* <SortDemo
                    title="Shell Sort"
                    exchange={exchange.indices}
                    compare={compare.number}
                    sort={shell.demo} /> */}

                <Image image={image} />
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
