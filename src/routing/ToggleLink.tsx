import React from "react";
import { Route, Navigate ,useMatch } from "react-router-dom";
//Router v6 では、RedirectコンポーネントがNavigateに置き換えられました。


interface ToggleLinkProps {
  to: string;
  exact?: boolean;
  className?: string;
  activeClass?: string;
  inActiveClass?: string;
  children: React.ReactNode;
}

interface ToggleLinkState {
  doNavigate: boolean;
}

export class ToggleLink extends React.Component<ToggleLinkProps, ToggleLinkState> {
  constructor(props: ToggleLinkProps) {
    super(props);
    this.state = {
      doNavigate: false
    };
  }

  handleClick = (): void => {
    this.setState({ doNavigate: true },
      () => this.setState({ doNavigate: false }));
  }

  render() {
    return (
      <RouteWrapper 
        path={this.props.to} 
        exact={this.props.exact}
      >
        {(match: boolean) => {
          const baseClasses = this.props.className ?? "m-2 btn btn-block";
          const activeClass = this.props.activeClass ?? "btn-primary";
          const inActiveClass = this.props.inActiveClass ?? "btn-secondary";

          const combinedClasses = 
            `${baseClasses} ${match ? activeClass : inActiveClass}`;

          return (
            <React.Fragment>
              {this.state.doNavigate && <Navigate to={this.props.to} />}
              <button className={combinedClasses} onClick={this.handleClick}>
                {this.props.children}
              </button>
            </React.Fragment>
          );
        }}
      </RouteWrapper>
    );
  }
}

// ラッパーコンポーネント
const RouteWrapper: React.FC<{
    path: string;
    exact?: boolean;
    children: (match: boolean) => React.ReactNode;
  }> = ({ path, exact, children }) => {
    const match = useMatch(path);
    return <>{children(!!match)}</>;
  };