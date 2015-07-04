"use strict";

import DeepLinkedStateMixin from "react-deep-link-state";
import React from "react";
import _ from "lodash";
import { Input, ButtonInput } from "react-bootstrap";

import FormMixin from "../../mixins/form"


export default React.createClass({
  displayName: "RegisterProject",
  mixins: [FormMixin, DeepLinkedStateMixin],

  getDefaultProps() {
    return {
      formEndpoint: "projects.json"
    };
  },

  getInitialState() {
    return {
      project: {
        /*eslint-disable */
        title: "",
        category: "web",
        description: "",
        technical_description: "",
        system_requirements: "",
        source_url: "",
        homepage: "",
        open_source: "true",
        closed_source_reason: ""
        /*eslint-enable */
      },
      wantsOpenSource: true
    };
  },

  renderOpenSource() {
    let openSource = null;
    if (this.state.project.category !== "multimedia") {
        openSource = <Input type="select"
                            label="Ești de acord ca proiectul să fie public (open-source) ? *"
                            value={this.state.project.open_source}
                            onChange={this.onOpenSourceChange}>
          <option value="true">Da</option>
          <option value="false">Nu</option>
        </Input>
    }
    return openSource;
  },

  renderWantsOpenSource() {
    let wantsOpenSource = null;
    if (this.state.project.category !== "multimedia") {
      if (this.state.project.open_source === "true") {
        wantsOpenSource = <Input type="url"
                                 placeholder="http://..."
                                 valueLink={this.deepLinkState(["project", "source_url"])}
                                 label="Adresa surselor și a documentației *"
                                 required />;
      } else {
        wantsOpenSource = <Input type="input"
                                 placeholder="Exemple de biblioteci private..."
                                 valueLink={this.deepLinkState(["project", "closed_source_reason"])}
                                 label="Care este motivul pentru care dorești ca proiectul tău să nu fie public (open-source) ? *"
                                 required />;
      }
    }

    return wantsOpenSource;
  },

  render() {
    return <form onSubmit={this.onFormSubmit}>
      <Input
        type="text"
        placeholder="Catalog Școlar"
        label="Titlul Lucrării *"
        valueLink={this.deepLinkState(["project", "title"])}
        required />
      <Input type="select"
             label="Categorie *"
             valueLink={this.deepLinkState(["project", "category"])}
             required>
        <option value="educational">Software Educațional</option>
        <option value="utilitar">Software Utilitar</option>
        <option value="roboti">Roboți</option>
        <option value="web">Web</option>
        <option value="multimedia">Multimedia</option>
      </Input>
      <Input type="textarea"
             label="Descriere *"
             valueLink={this.deepLinkState(["project", "description"])}
             required />
      <Input type="textarea"
             label="Descriere Tehnică *"
             valueLink={this.deepLinkState(["project", "technical_description"])}
             required />
      <Input type="textarea"
             label="Cerințe de sistem *"
             valueLink={this.deepLinkState(["project", "system_requirements"])}
             required />
      { this.renderOpenSource() }
      { this.renderWantsOpenSource() }
      { this.state.project.category === "web" ?
        <Input type="url"
               placeholder="http://..."
               label="Adresa lucrării *"
               valueLink={this.deepLinkState(["project", "homepage"])}
               required /> : null }
      <ButtonInput type="submit"
                   value="Pasul următor"
                   disabled={this.state.waitingForServerResponse} />
      {this.renderErrors()}
    </form>;
  },

  onOpenSourceChange(event) {
    let newProjectState = _.clone(this.state.project);
    newProjectState.open_source = event.currentTarget.value;

    this.setState({project: newProjectState});
  },

  getFormData() {
    let data = {};

    _.forIn(this.state.project, (value, key) => {
      let transformedKey = `project[${key}]`;
      data[transformedKey] = value;
    });

    return data;
  }
});
