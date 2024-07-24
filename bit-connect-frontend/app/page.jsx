'use client'
import Navbar from "@/components/navbar/page";
import Image from 'next/image';

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 overflow-y-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl text-gray-800 font-bold">Welcome to BIT Connect</h1>
          <p className="text-lg text-gray-600 mt-4">
            A platform designed for students and professors to interact, collaborate, and share knowledge.
          </p>
        </header>

        <section className="space-y-12">
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">Community</h2>
              <p className="text-gray-700 text-justify">
                Welcome to the vibrant hub of BIT Connect's community section! This space is designed to foster collaboration, discussion, and knowledge sharing among students and professors alike. Whether you're seeking academic insights, exploring innovative ideas, or simply looking to connect with peers who share your interests, you'll find a welcoming environment here.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="https://reputationtoday.in/wp-content/uploads/2020/04/4d8dd-students-in-community.001.png"
                alt="Community Image"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 flex justify-center order-2 md:order-1 md:pl-8 mb-8 md:mb-0">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQguPdu0aw0cjFFRH_En19K_RTS9ruhCKatMw&s"
                alt="Doubt Section Image"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">Doubt Section</h2>
              <p className="text-gray-700 text-justify">
                Welcome to the Doubt Section of BIT Connect, your go-to destination for academic support, clarification, and collaboration. Here, students and professors come together to address questions, clarify concepts, and deepen understanding through mutual assistance and engagement.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">Collaborative Projects</h2>
              <p className="text-gray-700 text-justify">
                Dive into collaborative projects where students and professors work together on research, events, and creative endeavors. Whether you're embarking on a research project, organizing an event, or launching a creative initiative, you'll find like-minded collaborators eager to join forces and make a meaningful impact.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="https://www.collaboration.co.uk/media/pages/images/Collaboration-Types-Social-Media.jpg"
                alt="Collaborative Projects Image"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 flex justify-center order-2 md:order-1 md:pl-8 mb-8 md:mb-0">
              <Image
                src="https://education.uic.edu/wp-content/uploads/2020/05/student-experience_hero.jpg"
                alt="Academic Resources Image"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">Academic Resources</h2>
              <p className="text-gray-700 text-justify">
                Explore a wealth of academic resources tailored for your success. From lecture notes and research papers to tutorials and study guides, our platform provides the tools you need to excel in your academic journey. Share your own resources and contribute to the collective knowledge of our community.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">Events and Workshops</h2>
              <p className="text-gray-700 text-justify">
                Stay updated with the latest events and workshops happening within our community. Participate in webinars, conferences, and workshops organized by peers and professors. Enhance your skills, expand your network, and gain new insights by engaging in our dynamic range of events.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="https://education.ec.europa.eu/sites/default/files/2022-01/join-an-event_720.jpg"
                alt="Events and Workshops Image"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
