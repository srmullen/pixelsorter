import 'tachyons';
import 'styles/styles.css';
// import "babel-polyfill";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortDemo from 'components/SortDemo';
import BogoSort from 'components/demo/BogoSort';
import BubbleSort from 'components/demo/BubbleSort';
import CocktailSort from 'components/demo/CocktailSort';
import InsertionSort from 'components/demo/InsertionSort';
import SelectionSort from 'components/demo/SelectionSort';
import ShellSort from 'components/demo/ShellSort';
import HeapSort from 'components/demo/HeapSort';
import QuickSort from 'components/demo/QuickSort';
import MergeSort from 'components/demo/MergeSort';

import * as browser from '../../test/browser';

window.browser = browser;

const SHOW_SORT_STATE = true;

class Main extends Component {
  render() {
    return (
      <div>
        {/* <BogoSort
                    showSortState={SHOW_SORT_STATE}/> */}

        {/* <BubbleSort
                    showSortState={SHOW_SORT_STATE} /> */}

        {/* <CocktailSort
                    showSortState={SHOW_SORT_STATE} /> */}

        {/* <SelectionSort
                    showSortState={SHOW_SORT_STATE} /> */}

        <InsertionSort showSortState={SHOW_SORT_STATE} />

        {/* <ShellSort
                    showSortState={SHOW_SORT_STATE} /> */}

        {/* <HeapSort
                    showSortState={SHOW_SORT_STATE} /> */}

        <MergeSort showSortState={SHOW_SORT_STATE} />

        {/* <QuickSort
                    showSortState={SHOW_SORT_STATE} /> */}

        {/* <SortDemo
                    title="Cocktail Sort"
                    exchange={exchange.indices}
                    compare={compare.number}
                    sort={cocktail.demo} /> */}
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
