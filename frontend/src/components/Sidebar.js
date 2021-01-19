import React, { Component } from "react";
import SidebarRow from "./SidebarRow";
import store from "../redux/store";

class Sidebar extends Component {
  state = {};

  handleRemoveUser = (id, name) => {
    this.props.handleRemoveUser(id, name);
  };

  handleChangeUserRole = (id, name, role) => {
    this.props.handleChangeUserRole(id, name, role);
  };

  render() {
    console.log(this.props.users);
    //tohle budu řešit v mainu a pošlu to jako prop do sidebaru
    //let userObj = this.props.users.find(obj => obj.profile.id === store.getState().user.user.id);
    //console.log(userObj);
    let usersArr = this.props.users.map((user) => (
      <SidebarRow
        key={user.id}
        id={user.id}
        first_name={user.first_name}
        last_name={user.last_name}
        profile_pic={user.profile_pic}
        role={user.role}
        //userRole={userObj.role}
        //callback funkce pro vyvolání modálních oken
        handleDelete={this.handleRemoveUser}
        handleChangeRole={this.handleChangeUserRole}
      />
    ));
    return (
      <nav id="sidebar" className="py-5 px-4">
        <div className="sidebar-header pb-4">
          <h5>Členové skupiny</h5>
        </div>
        <div className="sidebar-body mt-5">{usersArr}</div>
      </nav>
    );
  }
}

export default Sidebar;
