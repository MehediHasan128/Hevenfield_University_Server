import config from "../../config";
import { userRole } from "../../modules/user/user.constant";
import { User } from "../../modules/user/user.model";

const superAdmin = {
        id: 'SA-2025-001',
        email: 'mdmahfuz@havenfield.edu',
        userName: {firstName: 'Md', lastName: 'Mahfuz'},
        password: config.super_admin_default_pass,
        needPasswordChange: false,
        role: 'super-admin',
        status: 'active',
        isDeleted: false,
};

const seedSuperAdmin = async() => {

    const isSuperAdminExist = await User.findOne({role: userRole.superAdmin});
    if(!isSuperAdminExist){
        await User.create(superAdmin);
    }

};

export default seedSuperAdmin;