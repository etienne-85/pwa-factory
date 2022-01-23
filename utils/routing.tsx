import React from "react";
import {
    Route,
    useLocation,
    Link,
    Routes,
    useMatch
} from "react-router-dom";
import '../pwa.css'
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AppRoutes = (props: any) => {
    const { children } = props

    return (<>
        <Routes>
            <Route path={"/"} element={<AppLinks elements={children} />} />
            {React.Children.map(children, (child) => {
                const c = child.props.appClass
                const name = c ? c.Name : child.type.name
                if (!c) console.log(child)
                console.log(name)
                return (<Route path={`${name}/*`} element={child} />)
            })}
            {/* <Route path={`${path}/:topicId`}> */}
        </Routes>
    </>)
}

const AppLinks = ({ elements }) => {
    console.log(elements);
    return (
        <ul>
            {/* <li>toto</li> */}
            {React.Children.map(elements, (child) => {
                const c = child.props.appClass
                const name = c ? c.Name : child.type.name
                return (<li>
                    <Link
                        to={`${name}`}
                    >{name}</Link>
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

export const NavBar = () => {
    let location = useLocation();
    let hash = window.location.hash;
    return (<div id="navBar">{location.pathname}{hash}</div>)
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
