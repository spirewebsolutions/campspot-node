import 'shelljs';
import util from 'util'
import User from '../model/user';
import Container from '../model/container';

export default class UserService {
	/**
	 * search for campgrounds available

	 * @returns {{}}
	 */
	static create(user, contDetail) {

    const userCnt = Container.fromObject(contDetail);

    const command = util.format(
      'docker run -d --name=%s -v %s:/sharedhost -p %i:80 -p %i:443 -it %s',
      userCnt.name,
      userCnt.volume,
      userCnt.httpPort,
      userCnt.httpsPort,
      userCnt.imageName
    );

    // execute the command and
    // return success if we get a return value of 0
    if (exec('echo ' + command).code !== 0){
      return {};
    }

    return {borked: true};

	}
}
