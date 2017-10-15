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
import InsertionSort from "components/demo/InsertionSort";
import SelectionSort from "components/demo/SelectionSort";
import HeapSort from "components/demo/HeapSort";
import QuickSort from "components/demo/QuickSort";
import MergeSort from "components/demo/MergeSort";
import image from "images/six_pack_jason_walker.jpg";

import * as browser from "../test/browser";

window.browser = browser;

const SHOW_SORT_STATE = true;

class Main extends Component {
    render () {
        return (
            <div>
                <BogoSort
                    showSortState={SHOW_SORT_STATE}/>

                <BubbleSort
                    showSortState={SHOW_SORT_STATE} />

                <CocktailSort
                    showSortState={SHOW_SORT_STATE} />

                <InsertionSort
                    showSortState={SHOW_SORT_STATE} />

                <SelectionSort
                    showSortState={SHOW_SORT_STATE} />

                <HeapSort
                    showSortState={SHOW_SORT_STATE} />

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

                <Image image={image} scale={0.5} />
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
