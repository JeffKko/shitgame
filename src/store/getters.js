export default {
	levelRandom: state => {
		switch (state.level) {
      case 1:
        return 0.5
        break;
      case 2:
        return 0.4
        break;
      case 3:
        return 0.3
        break;
      case 4:
        return 0.2
        break;
      case 5:
        return 0.1
      break;
      default:
        return 0.5
      }
  }
}