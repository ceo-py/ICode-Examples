import { Accordion, AccordionItem, Image, Link } from "@nextui-org/react";
import { MetaTags } from "../MetaTags/MetaTags";
import { selectedThemeSignal } from "../NavMenu/ThemeSwitch/ThemeSignal";

export default function About() {
  const discordBotLink = (
    <Link isExternal href="https://www.ceo-py.eu/DiscordBot/">
      Discord Bot
    </Link>
  );

  return (
    <>
      <MetaTags
        title="About"
        description="Welcome to iCode Example, your go-to destination for comprehensive coding task solutions. Founded with a passion for sharing knowledge and fostering a collaborative coding community. We believe in the collective strength of shared knowledge and strive to make learning and understanding code accessible to everyone."
        keywords="icode example, softuni, programing, exam, problem solutions"
      />
      <Accordion variant="bordered">
        <AccordionItem
          key="1"
          aria-label="About"
          title="About"
          startContent={
            selectedThemeSignal.value !== "dark" && (
              <Image
                width={200}
                alt="iCode Example Picture"
                src="assets/MetaPic.png"
              />
            )
          }
        >
          Welcome to iCode Example, your go-to destination for comprehensive
          coding task solutions. Founded with a passion for sharing knowledge
          and fostering a collaborative coding community. We believe in the
          collective strength of shared knowledge and strive to make learning
          and understanding code accessible to everyone.
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Language Support"
          title="Extensive Language Support"
        >
          We understand that the coding landscape is vast and diverse. That's
          why iCode Example supports a wide range of programming languages,
          including: Python, C#, C++, JavaScript (JS), Java, HTML, CSS and
          MSSQL.
        </AccordionItem>
        <AccordionItem key="3" aria-label="Content" title="Rich Content">
          Our solutions not only include the code itself but also offer video
          explanations for a more immersive learning experience. We believe that
          visualizing the thought process behind the code enhances comprehension
          and skill development.
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Content"
          title="Community-Driven Platform"
        >
          iCode Example thrives on community engagement. Anyone can contribute
          by uploading their solutions, sharing their code, and providing video
          explanations. This collaborative spirit is what makes our platform
          dynamic and valuable.
        </AccordionItem>
        <AccordionItem
          key="5"
          aria-label="Search Mode"
          title="Smart Search Mode"
        >
          Navigating through our extensive collection of coding solutions is
          made easy with our smart search mode. You can directly choose your
          preferred programming language, module, and course to find example
          solutions tailored to your needs. Our advanced filter system allows
          you to fine-tune your search results based on language, code presence,
          video availability, and solution name. This ensures that you can
          quickly and efficiently find the exact coding solution you're looking
          for.
        </AccordionItem>
        <AccordionItem
          key="6"
          aria-label="Discord Bot"
          title="Discord Bot Support"
        >
          In addition to our web platform, we offer {discordBotLink} support.
          You can directly ask for task solutions through our {discordBotLink},
          making it even more convenient to access coding solutions on the go.
        </AccordionItem>
        <AccordionItem
          key="7"
          aria-label="Community"
          title="Join the Coding Community"
        >
          Whether you're a beginner looking for guidance or an experienced coder
          eager to share your expertise, iCode Example welcomes you. Explore our
          solutions, engage with the community, and enhance your coding skills
          with our diverse and comprehensive resources.
        </AccordionItem>
      </Accordion>
    </>
  );
}
