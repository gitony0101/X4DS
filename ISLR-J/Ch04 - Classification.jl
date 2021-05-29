### A Pluto.jl notebook ###
# v0.10.0

using Markdown

# ╔═╡ 3725204f-8060-417b-997b-40c254951024
begin
    using AlgebraOfGraphics
    using DataFrames, CSV
end

# ╔═╡ b307e3c2-7d3e-461c-b63f-51b0e30548ad
# load default data
defData = CSV.File("dataset/Default.csv") |> DataFrame;

# ╔═╡ e960d07f-feee-4810-a611-0a136fb8694e
# Figure 4.1
def_no = defData[(defData.default .== "No"), :]
def_no = def_no[1:1000, :]
def_yes = defData[(defData.default .== "Yes"), :]

p1 = scatter(def_no.balance, def_no.income, label="No default")
p1 = scatter!(def_yes.balance, def_yes.income, xlabel="Balance", ylabel="Income", label="Default")

p2 = boxplot(["No"], [def_no.balance])
p2 = boxplot!(["Yes"], [def_yes.balance], xlabel="Default", ylabel="Balance", legend=false)

p3 = boxplot(["No"], [def_no.income])
p3 = boxplot!(["Yes"], [def_yes.income], xlabel="Default", ylabel="Income", legend=false)

gr(size = (600, 1000))
plot(p1, p2, p3, layout =grid(1, 3, widths=[0.6 ,0.2, 0.2]))

# ╔═╡ 82cec5da-0643-424a-8b74-06e2b5d942bf
defData.is_Default = convert(Array{Int64, 1}, defData.default .== "Yes");

# ╔═╡ bea701cb-dc94-407e-9ee0-dcd8b6955226
# fit 
linear = lm(@formula(is_Default ~ balance), defData)

# ╔═╡ 825873bd-4c5b-464d-b2df-33f125f269e8
# Table 4.1
logit = glm(@formula(is_Default ~ balance), defData, Binomial(), LogitLink())

# ╔═╡ 84c60b32-c1bc-463b-81e7-d7e337ca4676
# figure 4.2
gr(size = (600, 300))

y_balance = def_yes.balance

def_no = defData[(defData.default .== "No"), :]
n_balance = def_no.balance

x = [0; 2700]
y = predict(linear, DataFrame(balance=x))
p1 = hline([0, 1], line=:dash, legend=false)
p1 = scatter!(y_balance, ones(length(y_balance)), markercolor="yellow")
p1 = scatter!(n_balance, zeros(length(n_balance)), markercolor="yellow")
p1 = plot!(x, y, lw = 3, lc="blue")

p2 = hline([0, 1], line=:dash, legend=false)
p2 = scatter!(y_balance, ones(length(y_balance)), markercolor="yellow")
p2 = scatter!(n_balance, zeros(length(n_balance)), markercolor="yellow")
x = collect(0:0.1:2700)
y = predict(logit, DataFrame(balance=x))
p2 = plot!(x, y, lw = 3, lc="blue")

plot(p1, p2, layout =grid(1, 2, widths=[0.5 ,0.5]))

# ╔═╡ 37f4941a-6ab4-46e8-b0c6-639fbca2c32f
# Table 4.2
logit_1 = glm(@formula(is_Default ~ student), defData, Binomial(), LogitLink())

# ╔═╡ f2fac9b8-958c-455b-b397-b76b7a711983
# Table 4.3
logit_2 = glm(@formula(is_Default ~ balance + income/1000 + student), defData, Binomial(), LogitLink())

# ╔═╡ 005482a1-afab-4f14-832c-8068a4fb7a13
# Figure 4.3
gr(size = (600, 300))

student_data = defData[(defData.student .== "Yes"), :]
non_stu_data = defData[(defData.student .== "No") , :]

num_student_default = nrow(student_data[(student_data.default .== "Yes"), :])
overall_default_student = num_student_default / nrow(student_data)

num_non_stu_default = nrow(non_stu_data[(non_stu_data.default .== "Yes"), :])
overall_default_non_stu = num_non_stu_default / nrow(non_stu_data)

p1 = hline([overall_default_student], line=:dash, label="Overall Student", lw=2, lc="orange")
p1 = hline!([overall_default_non_stu], line=:dash, label="Overall Non Student", lw=2, lc="blue")

default_student_data =  student_data[(student_data.default .== "Yes"), :]
p = []
for i in 0:2550
    x = nrow(default_student_data[default_student_data.balance .< i, :])
    push!(p, x/nrow(default_student_data))
end
p1 = plot!(collect(0:2550), p, legend = :outerbottom, label="Student", lc="orange")

default_non_student_data =  non_stu_data[(non_stu_data.default .== "Yes"), :]
p = []
for i in 0:2550
    x = nrow(default_non_student_data[default_non_student_data.balance .< i, :])
    push!(p, x/nrow(default_non_student_data))
end
# p1 = plot!(collect(500:2500), p, legend = :outerbottom, label="Non Student", xlabel="Balance", ylabel="Default Rate", lc="blue")
p1 = plot!(collect(0:2550), p, legend = :topleft, label="Non Student", xlabel="Balance", ylabel="Default Rate", lc="blue")


p2 = boxplot(["No"], [non_stu_data.balance])
p2 = boxplot!(["Yes"], [student_data.balance], xlabel="Student Status", ylabel="Credit Card Balance", legend=false)

plot(p1, p2, layout =grid(1, 2, widths=[0.65 ,0.35]))

# ╔═╡ d8a56394-cb4f-4c14-a003-d0286a008a93
# Figure 4.4
d1 = Normal(-1.25, 1.0)
d2 = Normal(1.25, 1.0)

p1 = plot(d1)
p1 = plot!(d2)
p1 = vline!([0], line = (4, :dash), legend=false)

# sample
x1 = rand(d1, 20)
x2 = rand(d2, 20)

# estimate
m1 = sum(x1) / 20
m2 = sum(x2) / 20
m = (m1 + m2) / 2

p2 = histogram(x1, bins=:sturges)
p2 = histogram!(x2, fill = 0, alpha = 0.5, bins=:sturges)
p2 = vline!([0], line=(4, :dash))
p2 = vline!([m], line=(4), legend=false)

plot(p1, p2)

# ╔═╡ 8ee2dcb7-5e18-4e0d-9402-e00f3b2b03d8
# Figure 4.5
mvnorm = MvNormal(zeros(2), [150.0 0; 0 150.0])
Z = [pdf(mvnorm,[i,j]) for i in -100:100, j in -100:100]
p1 = plot(-100:100,-100:100,Z,st=:surface)

mvnorm = MvNormal(zeros(2), [100.0 60.0; 60.0 200.0])
Z = [pdf(mvnorm,[i,j]) for i in -100:100, j in -100:100]
p2 = plot(-100:100,-100:100,Z,st=:surface)

plot(p1, p2)

# ╔═╡ e29a3d9b-ba7a-4309-9806-c291270588ea
# Figure 4.6,4.7, 4.8, 4.9, 4.10, 4.11
# Table 4.4 4.5
# TODO: Linear discriminant analysis is poorly documented in Julialang

# ╔═╡ 216e7dc9-8ca9-49cd-88db-7937c90be0b6


# ╔═╡ Cell order:
# ╠═3725204f-8060-417b-997b-40c254951024
# ╠═b307e3c2-7d3e-461c-b63f-51b0e30548ad
# ╠═e960d07f-feee-4810-a611-0a136fb8694e
# ╠═82cec5da-0643-424a-8b74-06e2b5d942bf
# ╠═bea701cb-dc94-407e-9ee0-dcd8b6955226
# ╠═825873bd-4c5b-464d-b2df-33f125f269e8
# ╠═84c60b32-c1bc-463b-81e7-d7e337ca4676
# ╠═37f4941a-6ab4-46e8-b0c6-639fbca2c32f
# ╠═f2fac9b8-958c-455b-b397-b76b7a711983
# ╠═005482a1-afab-4f14-832c-8068a4fb7a13
# ╠═d8a56394-cb4f-4c14-a003-d0286a008a93
# ╠═8ee2dcb7-5e18-4e0d-9402-e00f3b2b03d8
# ╠═e29a3d9b-ba7a-4309-9806-c291270588ea
# ╠═216e7dc9-8ca9-49cd-88db-7937c90be0b6
