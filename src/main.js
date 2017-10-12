import "tachyons";
import "./styles/styles.css";
import "babel-polyfill";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import Image from "components/Image";
import SortDemo from "components/SortDemo";
import BogoSort from "components/demo/BogoSort";
import BubbleSort from "components/demo/BubbleSort";
import CocktailSort from "components/demo/CocktailSort";
import QuickSort from "components/demo/QuickSort";
import MergeSort from "components/demo/MergeSort";
import image from "images/six_pack_jason_walker.jpg";
import * as compare from "./compare";
import * as exchange from "sort/exchange";
import * as bogo from "sort/bogo";
import * as selection from "sort/selection";
import * as bubble from "sort/bubble";
import * as cocktail from "sort/cocktail";
import * as insertion from "sort/insertion";
import * as shell from "sort/shell";
import * as merge from "sort/merge";

import * as browser from "../test/browser";

window.browser = browser;

class Main extends Component {
    render () {
        return (
            <div>
                <BogoSort
                    showSortState={true}/>

                <BubbleSort
                    showSortState={true} />

                <CocktailSort
                    showSortState={true} />

                {/* <SortDemo
                    title="Cocktail Sort"
                    exchange={exchange.indices}
                    compare={compare.number}
                    sort={cocktail.demo} /> */}

                {/* <MergeSort
                    exchange={exchange.copyFromList}
                    compare={compare.number} /> */}

                {/* <QuickSort
                    exchange={exchange.indices}
                    compare={compare.number} /> */}

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

                <Image image={image} scale={0.3} />
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
