const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const lotteryContractFactory = await hre.ethers.getContractFactory(
    "LotteryPortal"
  );
  const lotteryContract = await lotteryContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });

  await lotteryContract.deployed();

  console.log("Contract deployed to:", lotteryContract.address);
  console.log("Contract deployed by:", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    lotteryContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  await lotteryContract.getTotalTickets();

  let buyTicketTxn;

  buyTicketTxn = await lotteryContract.buyTicket("I want to win!");
  await buyTicketTxn.wait();

  await lotteryContract.getTotalTickets();

  buyTicketTxn = await lotteryContract
    .connect(randomPerson)
    .buyTicket("I want to win, too!");

  await buyTicketTxn.wait();
  await lotteryContract.getTotalTickets();

  contractBalance = await hre.ethers.provider.getBalance(
    lotteryContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  const tickets = await lotteryContract.getAllTickets();
  console.log(tickets);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
