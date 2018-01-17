import Calendar from "./Calendar";
import { DateTime, Duration } from "luxon";
import sinon from "sinon";

describe("Calendar", () => {
  it("should render without throwing", () => {
    shallow(<Calendar />);
  });

  it("defaults to today", () => {
    const calendar = shallow(<Calendar />);
    const monthString = DateTime.local().toLocaleString({
      month: "short",
      year: "numeric"
    });

    expect(calendar.find(".rev-Calendar-header-label").text()).to.contain(
      monthString
    );
  });

  it("treats invalid dates as today", () => {
    const calendar = shallow(<Calendar selectedDate="-05-17" />);
    const monthString = DateTime.local().toLocaleString({
      month: "short",
      year: "numeric"
    });

    expect(calendar.find(".rev-Calendar-header-label").text()).to.contain(
      monthString
    );
  });

  it("can advance a month backward", () => {
    const calendar = shallow(<Calendar />);
    calendar
      .find(".rev-Calendar-header-button--previous")
      .simulate("click", { preventDefault: () => null });
    const monthString = DateTime.local()
      .minus(Duration.fromObject({ month: 1 }))
      .toLocaleString({ month: "short", year: "numeric" });

    expect(calendar.find(".rev-Calendar-header-label").text()).to.contain(
      monthString
    );
  });

  it("can advance a month forward", () => {
    const calendar = shallow(<Calendar />);
    calendar
      .find(".rev-Calendar-header-button--next")
      .simulate("click", { preventDefault: () => null });
    const monthString = DateTime.local()
      .plus(Duration.fromObject({ month: 1 }))
      .toLocaleString({ month: "short", year: "numeric" });

    expect(calendar.find(".rev-Calendar-header-label").text()).to.contain(
      monthString
    );
  });
});
