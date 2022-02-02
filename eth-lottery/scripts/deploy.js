const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", accountBalance.toString());

  const lotteryContractFactory = await hre.ethers.getContractFactory(
    "LotteryPortal"
  );
  const lotteryContract = await lotteryContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await lotteryContract.deployed();

  console.log("Contract address:", lotteryContract.address); // 0x61ad7b99F15c7aAB6691B1fCF67E10048235c6F9
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
