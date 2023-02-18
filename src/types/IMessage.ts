// export type IMessage = {
// 	from: string,
// 	date: string,
// 	text: string,
// };

interface IMessage {
	from: string,
	date: string,
	text: string,
}

module.exports = {
	IMessage: {} as IMessage
};
