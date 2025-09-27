import { PlayCard } from '@/components/Card';
import { Footer } from '@/components/Footer';
import { useThemeContext } from '@/hooks/useThemes';
import { THEMES_DATA } from '@/constants/themes';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const { theme } = useThemeContext();
  const currentTheme = THEMES_DATA.find((data) => data.name === theme);

  return (
    <section className="w-full max-w-full mt-0 flex flex-col md:flex-row gap-x-16 items-center">
      <motion.img
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="rounded-2xl w-full h-[650px] object-contain hidden md:block shadow-lg hover:scale-105 transition-transform duration-500"
        src={
          currentTheme
            ? currentTheme['board-image']
            : 'https://res.cloudinary.com/dcugqfvvg/image/upload/v1713647295/standardboard.1d6f9426_asqzum.png'
        }
        alt="chess-board"
      />
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <PlayCard />
      </motion.div>
    </section>
  );
};

const ContributeSection = () => {
  return (
    <section className="mt-32 bg-bgAuxiliary2 text-textMain w-full px-10 lg:px-14 py-14 rounded-[36px] shadow-md">
      <div className="lg:grid grid-cols-[45%,1fr] gap-16 lg:gap-28 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-xl flex justify-center lg:justify-start"
        >
          <img
            className="max-w-[420px] w-full hover:scale-105 transition-transform duration-500"
            src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1713657312/undraw_questions_re_1fy7_kqjpu3.svg"
            alt="issue-illustration"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 lg:mt-0 space-y-6"
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-left animate-[fadeIn_1s]">
            Found an Issue?
          </h1>
          <p className="text-lg lg:text-xl text-left text-muted-foreground">
            Please create an issue on our GitHub page below. You are also welcome to
            contribute and improve the project.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full md:w-fit px-6 py-6 rounded-2xl text-2xl gap-4 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <a
              href="https://github.com/code100x/chess/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4"
            >
              <img
                className="w-12 h-12"
                src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1713657100/github-svgrepo-com_uosbko.svg"
                alt="github-icon"
              />
              <span className="text-3xl font-semibold">GitHub</span>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export const Landing = () => {
  return (
    <>
      <HeroSection />
      <ContributeSection />
      <Footer />
    </>
  );
};
