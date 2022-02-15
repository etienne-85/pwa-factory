import React from "react";
import {
    Route,
    Link,
    Routes
} from "react-router-dom";
import '../pwa.css'
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getRouteName = (comp) => {
    const c = comp.props.classObj
    const defaultRoute = c ? c.Name : comp.type.name
    const routeName = comp.props.customRouteName ? comp.props.customRouteName : defaultRoute;
    // if (!c) console.log(comp)
    // console.log(routeName)
    return routeName
}

export const AppRoutes = (props: any) => {
    const { children, index } = props
    // @todo forward children to indexcomponent
    // if (index) index.props = children    

    return (<>
        <Routes>
            <Route path={"/"} element={index ? index : <RouteLinks elements={children} />} />
            {React.Children.map(children, (child) => {
                const routeName = getRouteName(child)
                console.log(routeName)
                return (<Route path={`${routeName}/*`} element={child} />)
            })}
            {/* <Route path={`${path}/:topicId`}> */}
        </Routes>
    </>)
}

export const RouteLinks = ({ elements }) => {
    // console.log(elements);
    return (
        <ul>
            {/* <li>toto</li> */}
            {React.Children.map(elements, (child) => {
                const routeName = getRouteName(child)
                return (<li>
                    <Link
                        to={`${routeName}`}
                    >{routeName}</Link>
                </li>)
            })}
        </ul>)
}

export const AppChildren = ({ ...props }) => {
    const { children } = props;
    const str = window.location.hash.slice(1);
    // extract app sample name
    const childName = str.split('?')[0];
    // extract params
    const args = str.split('?')[1];
    const argList: any = args?.length ? args.split('&') : [];
    console.log(argList);
    // look for matching app sample
    let childMatch: any; //= children.find(child => child.type.name === childName);
    React.Children.forEach(children, (child) => {
        if (child.type.name === childName) {
            const childProps: any = {};
            argList.map((assignments: any) => assignments.split('='))
                .forEach((operands: any) => {
                    const key = operands[0];
                    const val = operands[1];
                    childProps[key] = val;
                });
            childMatch = React.cloneElement(child, childProps)
        }
    });
    childMatch && console.log("Load app sample " + childMatch?.type?.name);

    return (<>
        {/* {props.showOptions? <ShowOptions options={}/>:""} */}
        {childMatch ? childMatch :
            // ? <Link
            //     to={{
            //         // pathname: `${baseUrl}/${child.type.name}/`,
            //         hash: sampleName,
            //         // state: { fromDashboard: true }
            //     }}
            // >#{sampleName}</Link> : 
            <ul>
                {React.Children.map(children, (child) => (<li>
                    <Link
                        to={{
                            // pathname: `${baseUrl}/${child.type.name}/`,
                            hash: `${child.type.name}`,
                            // state: { fromDashboard: true }
                        }}>
                        {child.type.name}
                    </Link>
                </li>))}
            </ul>}
    </>)
}

// WIP: multiselect dropdown (react-select) to select url options
export const ShowOptions = ({ options }: { options: any }) => {
    console.log(options);
    const onOptionDropdown = () => {

    }
    return (<div>
        {/* <ul>
            {Object.keys(options).map(key => <li style={{ color: options[key] ? "red" : "white" }}>{key}</li>)}
        </ul> */}
        {/* <FontAwesomeIcon
            icon={faTrash}
            size="xs"
            style={{ margin: "4px 0px 0px 10px" }}
            onClick={onOptionDropdown}
        /> */}
    </div>)
}
