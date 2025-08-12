import { NavLink } from "react-router-dom";

const categories = [
  { slug: "arts", label: "Arts" },
  { slug: "decorations", label: "Decorations" },
  { slug: "furniture", label: "Furniture" },
];

const CategoryPills = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <NavLink
          key={c.slug}
          to={`/category/${c.slug}`}
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-full border ${isActive ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-secondary'}`
          }
        >
          {c.label}
        </NavLink>
      ))}
    </div>
  );
};

export default CategoryPills;
