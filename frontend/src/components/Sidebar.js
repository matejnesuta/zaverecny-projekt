import React, { Component } from "react";
import SidebarRow from "./SidebarRow";

class Sidebar extends Component {
  state = {};

  handleRemoveUser = (id, name) => {
    this.props.handleRemoveUser(id, name);
  };

  handleChangeUserRole = (id, name, role) => {
    this.props.handleChangeUserRole(id, name, role);
  };

  render() {
    //
    let usersArr = this.props.users.map((user) => (
      <SidebarRow
        key={user.id}
        id={user.id}
        name={user.name}
        role={user.role}
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
