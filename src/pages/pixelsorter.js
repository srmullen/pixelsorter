import "tachyons";
import "styles/styles.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Image from "components/Image";
import image from "images/six_pack_jason_walker.jpg";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      image
    };
  }

  render() {
    return (
      <div>
        <input
          className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
          type="file"
          name="file"
          onChange={event => {
            if (event.target.files && event.target.files[0]) {
              const reader = new FileReader();
              reader.onload = e => {
                this.setState({ image: e.target.result });
              };
              reader.readAsDataURL(event.target.files[0]);
            }
          }}
        />
        <Image image={this.state.image} />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
