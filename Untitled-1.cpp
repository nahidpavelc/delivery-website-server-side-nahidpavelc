#include <iostream>
using namespace std;
// ক্লাস তৈরি করলাম
class student
{
public:                         // Access specifier(এক্সেস স্পেসিফায়ার )
    string firstname, lastname; // এই ভেরিয়েবল মেইন ফাংশনের মধ্যে অবজেক্ট তৈরি করলে  অবজেক্ট  এর মধ্যে এস্যাইন হয়ে যাবে
    int roll;
};

int main()
{

    student std1; //অবজেক্ট ক্রিয়েট করলাম এখানে student ক্লাসের নাম এবং std1 অবজেক্ট
    student std2; //অবজেক্ট ক্রিয়েট করলাম এখানে student ক্লাসের নাম এবং std2 অবজেক্ট

    //এখানে std1 অবজেক্ট এবং firstname এবং lastname হচ্ছে student class এর ভেরিয়েবেল
    cout << "Enter Student 1 First Name: ";
    cin >> std1.firstname;

    cout << "Enter Student 1 Last Name: ";
    cin >> std1.lastname;

    cout << "Enter Student 1 Roll: ";
    cin >> std1.roll;

    cout << endl;

    //এখানে std2 অবজেক্ট এবং firstname এবং lastname হচ্ছে student class এর ভেরিয়েবেল
    cout << "Enter Student 2 First Name: ";
    cin >> std2.firstname;

    cout << "Enter Student 2 First Name: ";
    cin >> std2.lastname;

    cout << "Enter Student 2 Roll: ";
    cin >> std2.roll;

    cout << endl;
    cout << "Student1 Name: " << std1.firstname << " " << std1.lastname << endl;
    cout << "Student1 Roll: " << std1.roll << endl;
    cout << endl;
    cout << "Student2 Name: " << std2.firstname << " " << std2.lastname << endl;
    cout << "Student2 Roll: " << std2.roll << endl;

    return 0;
}