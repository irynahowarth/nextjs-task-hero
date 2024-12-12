import ProjectsTable from "../ui/projects/table";

export default function Projects() {

  const projects = [
    { 
      id: '122',
      name: 'Home',
      createdAt: '2023-12-11'},
      { 
        id: '123',
        name: 'Sports',
        createdAt: '2024-02-11'},
  ]

    return (
      <div className="">
        <h1 className="text-4xl font-bold">
        Projects Management Page
        </h1>
        <ProjectsTable projects={projects}/>
      </div>
    );
  }