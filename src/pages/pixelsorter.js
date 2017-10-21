import "tachyons";
import "styles/styles.css";
import "babel-polyfill";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import Image from "components/Image";
import image from "images/six_pack_jason_walker.jpg";

class Main extends Component {
    constructor () {
        super();
        this.state = {image};
    }

    render () {
        return (
            <div>
                <form>
                    <input
                        className="input-reset ba b--black-20 black-70 pa1 bg-transparent mh3 hover-bg-black hover--white hover f6"
                        type="file"
                        name="file"
                        onChange={(event) => {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                this.setState({image: e.target.result});
                            }
                            reader.readAsDataURL(event.target.files[0]);
                        }}
                    />
                </form>
                <Image image={this.state.image} scale={0.5} />
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));
