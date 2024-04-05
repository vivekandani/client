import React from "react";

function WidgetTags() {
  const tags = [
    "C",
    "C++",
    "Java",
    "JavaScript",
    "express",
    "firebase",
    "Mongodb",
  ];
  return (
    <div className="widget-tags">
      <h3>Watched Tags</h3>
      <div className="widget-tags-div">
        {tags.map((tag) => (
          <p key={tag}> {tag} </p>
        ))}
      </div>
    </div>
  );
}

export default WidgetTags;
