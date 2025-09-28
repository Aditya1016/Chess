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
            className="max-w-[420px] w-full hover:scale-105 transition-transform duration-500 rounded-xl shadow-lg"
            src="https://images.unsplash.com/photo-1604964432806-254d07c11f32?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          <h1 className="text-5xl lg:text-6xl font-bold text-left animate-[fadeIn_1s]">Found an Issue?</h1>
          <p className="text-lg lg:text-xl text-left text-muted-foreground">
            Please create an issue on our GitHub page below. You are also welcome to contribute and improve the project.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full md:w-fit px-6 py-6 rounded-2xl text-2xl gap-4 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <a
              href="https://github.com/Aditya1016/Chess/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4"
            >
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="github-icon"
              />
              <span className="text-3xl text-black font-semibold">GitHub</span>
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
