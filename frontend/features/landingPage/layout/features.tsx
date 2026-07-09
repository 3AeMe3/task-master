import {
  Authentication,
  Comments,
  ProgressFeat,
  SubTask,
  Tags,
} from '../components/features-cards';
export default function Features() {
  return (
    <section className="my-10 flex flex-col justify-center gap-3 text-left">
      <span data-aos="fade-right" className="font-semibold text-violet-600">
        FEATURES
      </span>
      <h2
        data-aos="fade-right"
        data-aos-delay="200"
        className="text-4xl font-bold"
      >
        TODO LO QUE NECESITAS
      </h2>
      <p data-aos="fade-right" data-aos-delay="250">
        Desde sprint planning hasta tareas diarias - AnkTask se adapta a ti.
      </p>

      <div className="my-5 grid grid-cols-1 items-center justify-center gap-4 lg:grid-cols-2 2xl:grid-cols-12 2xl:grid-rows-2">
        <Authentication />
        <Tags />
        <Comments />
        <ProgressFeat />
        <SubTask />
      </div>
    </section>
  );
}
