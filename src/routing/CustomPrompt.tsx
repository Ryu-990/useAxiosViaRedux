import React, { Component } from "react";

interface CustomPromptProps {
  show: boolean;
  message: string;
  callback: (result: boolean) => void;
}

export class CustomPrompt extends Component<CustomPromptProps> {
  render() {
    if (this.props.show) {
      return (
        <div className="alert alert-warning m-2 text-center">
          <h4 className="alert-heading">Navigation Warning</h4>
          {this.props.message}
          <div className="p-1">
            <button
              className="btn btn-primary m-1"
              onClick={() => this.props.callback(true)}
            >
              Yes
            </button>
            <button
              className="btn btn-secondary m-1"
              onClick={() => this.props.callback(false)}
            >
              No
            </button>
          </div>
        </div>
      );
    }
    return null;
  }
}