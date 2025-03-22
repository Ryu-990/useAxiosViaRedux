import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export function RouteInfo() {
    //ルーティング情報を取得
    const location = useLocation();
    const params = useParams<{ datatype?: string }>();

    //コンポーネント内の関数として定義
    const renderTable = (title: string, prop: any, propertyNames: string[]) => {
        return (
            <React.Fragment>
                <tr>
                    <th colSpan={2} className="text-center">
                        {title}
                    </th>
                </tr>
                {propertyNames.map((p) => (
                    <tr key={p}>
                        <td>{p}</td>
                        <td>{JSON.stringify(prop[p])}</td>
                    </tr>
                ))}
            </React.Fragment>
        );
    };

    // location と params から構築
    const match = {
        params,
        url: location.pathname,
        path: location.pathname,
        isExact: true
    };

    return (
        <div className="bg-info m-2 p-2">
            <h4 className="text-white text-center">Route Info</h4>
            <table className="table table-sm table-striped bg-light">
                <tbody>
                    {(params.datatype === undefined || params.datatype === "match") &&
                        renderTable("Match", match, ["url", "path", "params", "isExact"])}
                    {(params.datatype === undefined || params.datatype === "location") &&
                        renderTable("Location", location, [
                            "key",
                            "pathname",
                            "search",
                            "hash",
                            "state",
                        ])}
                </tbody>
            </table>
            <div className="text-center m-2 bg-light">
                <Link className="btn btn-primary m-2" to={location}>
                    Location
                </Link>
            </div>
        </div>
    );
}