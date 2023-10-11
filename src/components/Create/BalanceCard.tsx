type Props = {
  saldBalance: string | undefined;
};

const BalanceCard: React.FC<Props> = ({ saldBalance }) => {
  return (
    <section className="max-w-md rounded-xl bg-white p-4 text-[#202020]">
      <h3 className="text-2xl font-semibold">Remainder</h3>
      <div className="flex items-center justify-start text-lg">
        <img
          src="/images/sald-token.svg"
          className="w-10 h-10 md:w-12 md:h-12"
          alt="sald token"
        />
        {saldBalance} SALD
      </div>
    </section>
  );
};

export default BalanceCard;
