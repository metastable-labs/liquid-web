type TitleValue = {
  title: string;
  value: string | Array<string>;
};

interface AgentArticleProps {
  title: string;
  data: Record<string, TitleValue>;
}

const AgentArticle = ({ title, data }: AgentArticleProps) => {
  return (
    <div className="self-stretch max-w-xl flex flex-col gap-1.5">
      <h2 className="text-[13px] leading-[16.12px] font-medium text-primary-400">
        {title}
      </h2>
      <div className="border border-primary-150 bg-white rounded-2xl p-3.5 overflow-auto max-h-[354px] scrollbar-container">
        {Object.entries(data).map(([key, section]) => (
          <div
            key={key}
            className="mb-4 text-[14px] leading-[18.48px] text-primary-50"
          >
            <h3 className="font-bold">{section.title}:</h3>
            {Array.isArray(section.value) ? (
              <ul className="list-none space-y-2">
                {section.value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{section.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentArticle;
