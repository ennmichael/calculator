function attachTemplate(component, template) {
  component
    .attachShadow({ mode: "open" })
    .appendChild(template.content.cloneNode(true));
}
